<script>
    import Dropdown from './Dropdown.vue';
    import Setting from './Setting.vue';
    // import Card2 from './Card2.vue';
    export default {
        components:{
            Dropdown,
            Setting,
            // Card2
        }
    };
</script>
<template>
    <Card style="width: 17rem;" class="card">
        <template #title>
            <Setting class="setting-loc" :radius="100" direction="down-left" type="quarter-circle" showIcon="pi pi-cog "/>
            Tracker Details
        </template>
        <template #content>
            <h3>Tracker ID:</h3>
            <InputText placeholder="Name" style="margin-bottom: 0.8em"></InputText>
            <Textarea placeholder="Description" style="margin-bottom: 0.8em;" v-model="value" rows="4" cols="22"></Textarea>
            <Dropdown  style="margin-bottom: 0.8em"/>
        </template>
        <template #footer>
            <Button icon="pi pi-check" label="Save" />
            <Button icon="pi pi-times" label="Cancel" class="p-button-secondary" style="margin-left: .5em"/>
        </template>
    </Card>
    <!-- <Card2 /> -->
</template>

<style>
    .setting-loc {
        position: absolute;
        margin-left: 11em;
    }
    .card{
        padding: 15px;
        margin: 80px auto;
        /* border-radius: 100px; */
    }
</style>