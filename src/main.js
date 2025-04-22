import {
	createSSRApp
} from "vue";
import App from "./App.vue";
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { createPinia } from 'pinia';

export function createApp() {
	const app = createSSRApp(App);
	const pinia = createPinia();
	
	// 注册所有图标
	for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
		app.component(key, component);
	}
	
	app.use(ElementPlus);
	app.use(pinia);
	
	return {
		app,
		pinia
	};
}
