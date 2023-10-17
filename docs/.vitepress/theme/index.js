import Theme from 'vitepress/theme';
import './styles/index.less';
/* import { h } from 'vue'
import OutLine from "../components/OutLine.vue"; */
export default {
	...Theme,
	/* Layout() {
        return h(Theme.Layout, null, {
            'aside-outline-after': () => h(OutLine)
        })
    } */
};
