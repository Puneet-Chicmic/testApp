if(NOT TARGET fbjni::fbjni)
add_library(fbjni::fbjni SHARED IMPORTED)
set_target_properties(fbjni::fbjni PROPERTIES
    IMPORTED_LOCATION "/Users/vivek/.gradle/caches/transforms-3/709d435e157f32f6fca74e5c82ddfeb9/transformed/jetified-fbjni-0.3.0/prefab/modules/fbjni/libs/android.x86_64/libfbjni.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/vivek/.gradle/caches/transforms-3/709d435e157f32f6fca74e5c82ddfeb9/transformed/jetified-fbjni-0.3.0/prefab/modules/fbjni/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

