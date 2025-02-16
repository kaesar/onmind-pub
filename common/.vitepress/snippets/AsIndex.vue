<script setup>
import { ref, onMounted, computed } from 'vue'
const props = defineProps(['filtering','title'])
const index = ref([])
const result = ref([])
const searchQuery = ref('')
const selectedTags = ref([])  // 'code'
const allTags = ref([])

function onRow(e) {
    e.preventDefault()
    var url = e.target.getAttribute('url')
    if ( !url ) {
        url = e.target.parentNode.getAttribute('url')
        if ( !url ) {
            url = e.target.parentNode.parentNode.getAttribute('url')
        }
    }
    location.assign(url.replace('/doc/', '/').replace('.md', ''))
}

function onFilter(e) {
    e.preventDefault()
    searchQuery.value = e.target.value
    filterResults()
    /*let value = e.target.value
    let which = e.which

    if (value.length > 0 ) {  // getMatch(value)
        result.value = index.value?.filter((row) => {
            const exp = new RegExp(value,'gi')  // INITIALS: RegExp(`^${bit}`,'gi')
            return (exp.test(row.title) || exp.test(row.description) || exp.test(row.tags))
        })
    }
    else
        result.value = index.value  // .filter(e => (e.notable))

    return true*/
}

const toggleTag = (tag) => {
    if (selectedTags.value.includes(tag)) {
        selectedTags.value = selectedTags.value.filter(t => t !== tag)
    } else {
        selectedTags.value.push(tag)
    }
    filterResults()
}

const filterResults = () => {
    result.value = index.value.filter(item => {
        const matchesQuery = !searchQuery.value || item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        const matchesTags = selectedTags.value.length === 0 || selectedTags.value.every(tag => item.tags?.includes(tag))
        return matchesQuery && matchesTags
    })
}

onMounted(() => {
    let uri = '/_index.json'

    fetch(uri)
    .then(res => res.json())
    .then(data => {
        //const lang = location.href.split('/');
        //console.log(data);
        const list = data
            .filter(e => !e.hide )
                //&& e.language === lang[lang.length - 2]
                //&& e.category.toLowerCase() === 'code'
            .sort((a, b) => a.title.localeCompare(b.title));
        
        index.value = list;
        result.value = list;
        allTags.value = [...new Set(list.flatMap(item => item.tags || []))].sort();
    })
    .catch(err => {
        console.error(err.message);
    });
})
</script>

<template>
    <div :style="{ textAlign: allTags.length ? 'left' : 'center' }" v-if="index?.length >= 18">
        <strong v-if="!!title">{{ title }}<br /></strong>
        <input type="text" name="filter" placeholder="&#128269; ..." autocomplete="off" @keyup="onFilter" />
        <div class="tags-container">
            <button 
                v-for="tag in allTags" 
                :key="tag" 
                :class="{ 'tag-selected': selectedTags.includes(tag) }" 
                @click="toggleTag(tag)"
                class="tag"
            >
                {{ tag }}
            </button>
        </div>
    </div>
    <br v-if="index?.length >= 18" />
    <div class="showcase">
        <a v-for="item in result" @click="onRow" :url="item.url" class="blog-card">
            <div :url="item.url">
                <div class="titlex">{{ item.title || item.name }}</div>
                <small>{{ item.description || 'About: ' + item.name }}</small>
            </div>
        </a>
    </div>
</template>

<style scoped>
input {
    color: #000;
    background-color: snow;
    display: inline-block;
    padding-left: 12px !important;
    border-radius: 20px !important;
}

.titlex {
    border-bottom: 0.1px inset;
    border-color: #aaa;
    transform: translateY(-7px);
}

.showcase {
    display: grid;
    padding-left: 0rem;
    padding-right: 0rem;
    gap: 1.5rem;
    grid-auto-rows: 12rem;
    grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
}

.blog-card {
    grid-column: span 1.5;
    border-radius: 5px;
    box-shadow: 0 3px 10px 0 #aaa;
    padding: 1rem;
    text-decoration: none;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.3s;
}

.blog-card:hover {
    transform: scale(1.05);
    box-shadow: 0 3px 10px 0 var(--high-color);
    color: var(--high-color);
}

.tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
}

.tag {
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    background-color: #f3f4f6; /* bg-gray-100 */
    color: #374151; /* text-gray-700 */
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease;
}

.tag-selected {
    background-color: #3b82f6; /* bg-blue-500 */
    color: white;
}

@media (max-width: 580px) {
    .showcase {
        padding: 1rem;
    }

    .blog-card {
        grid-column: span 4;
    }
}
</style>
