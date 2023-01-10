<template>
	<ul class="todo-main">
		<Item v-for="itemObj in todoList" :key="itemObj.id" :itemObj="itemObj" />
	</ul>
</template>

<script>
	import Item from "./Item.vue";
	import {mapState} from "vuex";

	export default {
		name: "List",
		components: {
			Item
		},
		computed: {
			//借助mapState从state中读取数据
			...mapState(["todoList"])
		}
	}
</script>

<style scoped>
	/*main*/
	.todo-main {
		margin-left: 0px;
		border: 1px solid #ddd;
		border-radius: 2px;
		padding: 0px;
	}

	.todo-empty {
		height: 40px;
		line-height: 40px;
		border: 1px solid #ddd;
		border-radius: 2px;
		padding-left: 5px;
		margin-top: 10px;
	}
</style>
