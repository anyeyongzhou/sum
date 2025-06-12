import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig, loadEnv, ConfigEnv } from 'vite';
import vueSetupExtend from 'vite-plugin-vue-setup-extend-plus';
import viteCompression from 'vite-plugin-compression';
import { buildConfig } from './src/utils/build';
import AutoImport from 'unplugin-auto-import/vite';
import { lazyImport, VxeResolver } from 'vite-plugin-lazy-import';

const pathResolve = (dir: string) => {
	return resolve(__dirname, '.', dir);
};

const alias: Record<string, string> = {
	'/@': pathResolve('./src/'),
	'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
};

const viteConfig = defineConfig((mode: ConfigEnv) => {
	const env = loadEnv(mode.mode, process.cwd());
	return {
		plugins: [
			vue({
				reactivityTransform: true, // 确保启用完整调试功能
			}),
			vueSetupExtend(),
			viteCompression(),
			JSON.parse(env.VITE_OPEN_CDN) ? buildConfig.cdn() : null,
			AutoImport({
				imports: ['vue'],
				dts: 'src/auto-import.d.ts',
			}),
			lazyImport({
				resolvers: [
					VxeResolver({
						libraryName: 'vxe-table',
					}),
					VxeResolver({
						libraryName: 'vxe-pc-ui',
					}),
				],
			}),
		],
		root: process.cwd(),
		resolve: { alias },
		base: mode.command === 'serve' ? './' : env.VITE_PUBLIC_PATH,
		optimizeDeps: { exclude: ['vue-demi'] },
		assetsInclude: ['**/*.bpmn'],
		server: {
			host: '0.0.0.0',
			port: env.VITE_PORT as unknown as number,
			open: JSON.parse(env.VITE_OPEN),
			hmr: true,
			proxy: {
				// '/api': {
				// 	target: 'http://221.226.177.198:11428',
				// 	ws: true,
				// 	changeOrigin: true,
				// 	rewrite: (path) => path.replace(/^\/api/, '/api'),
				// },
				'/dev-api/': {
					// target: 'http://192.168.2.73:80', // 杜森笔记本
					target: 'http://192.168.112.60:80', // 石榴测试环境
					// target: 'http://192.168.254.1:80', // 杜森笔记本
					// target: 'http://192.168.138.195:80', // 杜森笔记本
					ws: true,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/dev-api/, '/dev-api'),
				},
			},
		},
		build: {
			outDir: 'dist',
			chunkSizeWarningLimit: 1500,
			rollupOptions: {
				output: {
					chunkFileNames: 'assets/js/[name]-[hash].js',
					entryFileNames: 'assets/js/[name]-[hash].js',
					assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
					manualChunks(id) {
						if (id.includes('node_modules')) {
							return id.toString().match(/\/node_modules\/(?!.pnpm)(?<moduleName>[^\/]*)\//)?.groups!.moduleName ?? 'vender';
						}
					},
				},
				sourcemap: true, // 生产环境生成 sourcemap
				...(JSON.parse(env.VITE_OPEN_CDN) ? { external: buildConfig.external } : {}),
			},
		},
		css: { preprocessorOptions: { css: { charset: false } }, devSourcemap: true },
		esbuild: {
			sourcemap: 'inline', // ESBuild 生成内联 sourcemap
		},
		define: {
			__VUE_I18N_LEGACY_API__: JSON.stringify(false),
			__VUE_I18N_FULL_INSTALL__: JSON.stringify(false),
			__INTLIFY_PROD_DEVTOOLS__: JSON.stringify(false),
			__NEXT_VERSION__: JSON.stringify(process.env.npm_package_version),
			__NEXT_NAME__: JSON.stringify(process.env.npm_package_name),
		},
	};
});

export default viteConfig;
