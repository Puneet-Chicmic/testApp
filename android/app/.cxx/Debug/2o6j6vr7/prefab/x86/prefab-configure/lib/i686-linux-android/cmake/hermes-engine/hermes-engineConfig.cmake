if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/vivek/.gradle/caches/transforms-3/2456d66d88fa512e3e22ac4e6c4ee256/transformed/jetified-hermes-android-0.71.3-debug/prefab/modules/libhermes/libs/android.x86/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/vivek/.gradle/caches/transforms-3/2456d66d88fa512e3e22ac4e6c4ee256/transformed/jetified-hermes-android-0.71.3-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

