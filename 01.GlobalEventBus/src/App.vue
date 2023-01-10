<template>
	<div id="root">
		<div class="todo-container">
			<div class="todo-wrap">
				<Header @addTodoItem="addTodoItem"></Header>
				<List :todoList="todoList"></List>
				<Footer :todoList="todoList" @checkAll="checkAll" @clearDone="clearDone"></Footer>
			</div>
		</div>
	</div>
</template>

<script>
	import Header from "./components/Header.vue";
	import List from "./components/List.vue";
	import Footer from "./components/Footer.vue";

	export default {
		name: "App",
		components: {
			Header,
			List,
			Footer
		},
		data() {
			return {
				//初始化时从本地存储读取数据
				todoList: JSON.parse(localStorage.getItem("todoList")) || []
			}
		},
		methods: {
			//将todo项添加进todo列表
			addTodoItem(todoObj) {
				this.todoList.unshift(todoObj);
			},
			//选中/不选中checkbox组件
			checkById(id) {
				this.todoList.forEach((todoItem) => {
					if (todoItem.id == id) {
						todoItem.done = !todoItem.done;
					}
				});
			},
			//删除对应组件
			deleteById(id) {
				this.todoList.forEach((todoItem, index) => {
					if (todoItem.id == id)
						this.todoList.splice(index, 1);
				});
			},
			//编辑对应组件
			editById(id, value) {
				this.todoList.forEach((todoItem) => {
					if (todoItem.id == id) {
						todoItem.title = value;
					}
				});
			},
			//清除已完成任务
			clearDone() {
				this.todoList = this.todoList.filter((todoItem) => {
					return !todoItem.done;
				});
			},
			//全选/全不选
			checkAll(done) {
				this.todoList.forEach((todoItem) => {
					todoItem.done = done;
				});
			}
		},
		watch: {
			//监视todoList，进行本地存储
			todoList: {
				//开启深度监视，监视是否勾选
				deep: true,
				handler(value) {
					localStorage.setItem("todoList", JSON.stringify(value));
				}
			}
		},
		mounted() {
			//在全局事件总线上绑定checkById事件
			this.$bus.$on("checkById", this.checkById);
			//在全局事件总线上绑定deleteById事件
			this.$bus.$on("deleteById", this.deleteById);
			//在全局事件总线上绑定editById事件
			this.$bus.$on("editById", this.editById);
		},
		beforeDestroy() {
			//在全局事件总线上解绑checkById事件
			this.$bus.$off("checkById");
			//在全局事件总线上解绑deleteById事件
			this.$bus.$off("deleteById");
			//在全局事件总线上解绑editById事件
			this.$bus.$off("editById");
		}
	}
</script>

<style>
	/*base*/
	body {
		background: #fff;
	}

	.btn {
		display: inline-block;
		padding: 4px 12px;
		margin-bottom: 0;
		font-size: 14px;
		line-height: 20px;
		text-align: center;
		vertical-align: middle;
		cursor: pointer;
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
		border-radius: 4px;
	}

	.btn-danger {
		color: #fff;
		background-color: #da4f49;
		border: 1px solid #bd362f;
	}

	.btn-danger:hover {
		color: #fff;
		background-color: #bd362f;
	}

	.btn-edit {
		color: #fff;
		background-color: skyblue;
		border: 1px solid #39c1ab;
		margin-right: 5px;
	}

	.btn-edit:hover {
		color: #fff;
		background-color: #39c1ab;
	}

	.btn:focus {
		outline: none;
	}

	.todo-container {
		width: 600px;
		margin: 0 auto;
	}

	.todo-container .todo-wrap {
		padding: 10px;
		border: 1px solid #ddd;
		border-radius: 5px;
	}
</style>
