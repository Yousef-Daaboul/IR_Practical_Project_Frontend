import SearchEngine from "../components/SearchEngine.vue";
import DocumentContent from "../components/DocumentContent.vue";

export const routes = [
    {
        path: '/',
        component: SearchEngine,
    },
    {
        name: 'doc_content',
        path: '/doc_content',
        component: DocumentContent,
    },
]