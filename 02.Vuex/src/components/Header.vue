<template>
	<div class="todo-header">
		<input type="text" placeholder="请输入你的任务名称，按回车键确认" v-model="title" @keyup.enter="addTodoItem()" />
	</div>
</template>

<script>
	import {
		nanoid
	} from "nanoid";

	export default {
		name: "Header",
		data() {
			return {
				title: ""
			}
		},
		methods: {
			//添加todo项
			addTodoItem() {
				//校验数据
				if (!this.title) {
					return alert("输入不能为空");
				}
				//封装todo项
				const todoItemObj = {
					id: nanoid(),
					title: this.title,
					done: false,
					isEdit: false
				};
				//通过vuex将todo项添加进todo列表
				this.$store.dispatch("addTodoItem", todoItemObj);
				//清空title输入
				this.title = "";
			}
		}
	}
</script>

<style scoped>
	/*header*/
	.todo-header input {
		width: 560px;
		height: 28px;
		font-size: 14px;
		border: 1px solid #ccc;
		border-radius: 4px;
		padding: 4px 7px;
	}

	.todo-header input:focus {
		outline: none;
		border-color: rgba(82, 168, 236, 0.8);
		box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
	}
</style>
