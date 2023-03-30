import { isPlainObject } from 'lodash';
import { ApolloClient } from 'apollo-client';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import auth from '@react-native-firebase/auth';
import perf from '@react-native-firebase/perf';
import AsyncStorage from '@react-native-community/async-storage';
import uuid from 'uuid';
import * as Sentry from '@sentry/react-native';

import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { ApolloLink, Operation, Observable, fromPromise } from 'apollo-link';
import { createPersistedQueryLink } from 'apollo-link-persisted-queries';
import { createHttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { isPast } from 'date-fns';

let cache: InMemoryCache | undefined;
let cachePromise: Promise<InMemoryCache> | undefined;

const updateHeaders = (
  operation: Operation,
  newHeaders: { [key: string]: string },
) => {
  const prevHeaders = operation.getContext().headers || {};
  operation.setContext({
    headers: {
      ...prevHeaders,
      ...newHeaders,
    },
  });
};

async function initCache() {
  cache = new InMemoryCache({
    dataIdFromObject: (o) => {
      const orig = defaultDataIdFromObject(o);
      if (orig) {
        return orig;
      }

      return null;
    },
  });

  await persistCache({ cache, debug: __DEV__, storage: AsyncStorage as any });

  return cache;
}

async function getCache() {
  if (!cachePromise) {
    cachePromise = initCache();
  }

  return cachePromise;
}

const request = async (operation: Operation) => {
  if (operation.getContext().noAuth) {
    return;
  }

  const currentUser = await auth().currentUser;
  if (!currentUser) {
    return;
  }
  const tokenResult = await currentUser.getIdTokenResult();

  if (!tokenResult) {
    return;
  }

  if (isPast(new Date(tokenResult.expirationTime))) {
    const refreshResult = await currentUser.getIdTokenResult(true);
    if (!refreshResult.token) {
      return;
    }
    token = refreshResult.token;
  }

  updateHeaders(operation, {
    Authorization: `Bearer ${token}`,
  });
};

const cleanTypenameLink = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    operation.variables = omitDeep(operation.variables, '__typename');
  }

  return forward!(operation).map((data) => {
    return data;
  });
});

function omitDeep(obj: Record<string, any>, key: string) {
  const keys = Object.keys(obj);
  const newObj: typeof obj = {};
  keys.forEach((i) => {
    if (i !== key) {
      const val = obj[i];
      if (val instanceof Date) {
        newObj[i] = val;
      } else if (Array.isArray(val)) {
        newObj[i] = omitDeepArrayWalk(val, key);
      } else if (isPlainObject(val) && val !== null) {
        newObj[i] = omitDeep(val, key);
      } else {
        newObj[i] = val;
      }
    }
  });
  return newObj;
}

function omitDeepArrayWalk(arr: any[], key: string): any[] {
  return arr.map((val) => {
    if (Array.isArray(val)) {
      return omitDeepArrayWalk(val, key);
    } else if (typeof val === 'object') {
      return omitDeep(val, key);
    }
    return val;
  });
}

const requestLink = new ApolloLink((operation, forward) => {
  return new Observable((observer) => {
    let handle: any;

    Promise.resolve(operation)
      .then((oper) => request(oper))
      .then(() => {
        handle = forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        });
      })
      .catch(observer.error.bind(observer));

    return () => {
      if (handle) {
        handle.unsubscribe();
      }
    };
  });
});

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  const transactionId = operation.getContext().transactionId;

  if (graphQLErrors) {
    graphQLErrors.map((err) => {
      const { message, locations, path } = err;
      Sentry.withScope((scope) => {
        transactionId && scope.setTag('transaction_id', transactionId);
        Sentry.captureException(err);
      });
      console.warn(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      );
    });
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
    if (!networkError.message.includes('Network request failed')) {
      Sentry.withScope((scope) => {
        transactionId && scope.setTag('transaction_id', transactionId);
        Sentry.captureException(networkError);
      });
    }
  }
});

const perfLink = new ApolloLink((operation, forward) => {
  const trace = perf().newTrace('graphql-operation');

  const transactionId = uuid.v4();
  operation.setContext({ transactionId });

  updateHeaders(operation, {
    'x-transaction-id': transactionId,
  });

  Sentry.addBreadcrumb({
    type: 'info',
    category: 'api',
    level: Sentry.Severity.Info,
    message: `graphql operation`,
    data: {
      operation: operation.operationName,
      variables: operation.variables,
    },
  });
  trace.putAttribute('operation', operation.operationName);

  return fromPromise(trace.start()).flatMap(() =>
    forward(operation).map((data) => {
      trace.stop();
      return data;
    }),
  );
});

const persistedQueryLink = createPersistedQueryLink({
  useGETForHashedQueries: true,
});

let link: ApolloLink;
let linkPromise: Promise<ApolloLink> | undefined;

async function initLink() {
  let baseUrl;

  const isEmulator = await DeviceInfo.isEmulator();

  // if (__DEV__) {
    //   if (isEmulator) {
    //     baseUrl = Platform.select({
    //       android: 'http://api.yellowexpress.com',
    //       ios: 'http://api.yellowexpress.com',
    //       default: 'http://api.yellowexpress.com',
    //     });
    //   } else {
    //     baseUrl = 'http://api.yellowexpress.com';
    //   }
    // } else {
    baseUrl:"https://1ac9-112-196-113-2.in.ngrok.io"
    // baseUrl = 'https://1ac9-112-196-113-2.in.ngrok.io';
    
    
   
  // }

  const httpLink = createHttpLink({
    uri: `${baseUrl}/v1/graphql`,
    credentials: 'include',
  });

  link = ApolloLink.from([
    cleanTypenameLink,
    // queueLink,
    errorLink,
    perfLink,
    requestLink,
    persistedQueryLink,
    httpLink,
  ]);

  return link;
}

async function getLink() {
  if (!linkPromise) {
    linkPromise = initLink();
  }

  return linkPromise;
}

export async function getApolloClient() {
  const [cache, link] = await Promise.all([getCache(), getLink()]);

  return new ApolloClient({
    name: `yellowexpress-${Platform.OS}`,
    version: DeviceInfo.getVersion(),
    link,
    cache,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        notifyOnNetworkStatusChange: true,
      },
    },
  });
}
