
import { defineConfig } from 'vite';
export default defineConfig({
    build: {
        minify: false,
        terserOptions: {
            compress: false,
            mangle: false,
        },
        rollupOptions: {
            output: {
                chunkFileNames: 'js/[name]-[hash].js',
                entryFileNames: 'js/[name]-[hash].js',

                assetFileNames: ({name}) => {
                    if (/\.(gif|jpe?g|png|svg|webp)$/.test(name ?? '')){
                        return 'assets/images/[name]-[hash][extname]';
                    }

                    if (/\.css$/.test(name ?? '')) {
                        return 'css/[name]-[hash][extname]';
                    }

                    // default value
                    // ref: https://rollupjs.org/guide/en/#outputassetfilenames
                    return 'assets/[name]-[hash][extname]';
                },
            },

            // https://rollupjs.org/guide/en/#big-list-of-options
        }
    }
})