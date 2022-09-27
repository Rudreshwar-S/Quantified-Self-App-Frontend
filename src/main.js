import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Button from 'primevue/button'
import Menubar from 'primevue/menubar'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown';
import Card from 'primevue/card';
import Textarea from 'primevue/textarea';
import SpeedDial from 'primevue/speeddial';
import Dialog from 'primevue/dialog'
import Carousel from 'primevue/carousel';
import Checkbox from 'primevue/checkbox';
import Password from 'primevue/password';
import Divider from 'primevue/divider';
import router from './router'
import 'primevue/resources/themes/bootstrap4-dark-purple/theme.css'     //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'    
import './style.css'
const app = createApp(App);
app.use(PrimeVue);
app.component('Button', Button);
app.component('Dropdown', Dropdown);
app.component('Menubar', Menubar);
app.component('InputText', InputText);
app.component('Card', Card);
app.component('Textarea', Textarea);
app.component('SpeedDial', SpeedDial);
app.component('Dialog', Dialog);
app.component('Carousel', Carousel);
app.component('Checkbox', Checkbox);
app.component('Password', Password);
app.component('Divider', Divider);
app.use(router).mount('#app')
