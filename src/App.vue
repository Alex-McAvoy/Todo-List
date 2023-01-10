<template>
	<!-- <div id="app">
		<Header></Header>
		<List></List>
		<Footer></Footer>
	</div> -->
	<div id="root">
		<div class="todo-container">
			<div class="todo-wrap">
				<Header @addTodo="addTodo"></Header>
				<List :todos="todos"></List>
				<Footer :todos="todos" @checkAll="checkAll" @deleteAll="deleteAll"></Footer>
			</div>
		</div>
	</div>

</template>

<script>
	import Header from './components/Header.vue'
	import List from './components/List.vue'
	import Footer from './components/Footer.vue'

	export default {
		name: 'App',
		components: {
			Header,
			List,
			Footer
		},
		data() {
			return {
				//初始化时从本地存储读取数据
				todos: JSON.parse(localStorage.getItem("todos")) || []
			}
		},
		methods: {
			//接收todoObj并添加进todos
			addTodo(todoObj) {
				this.todos.unshift(todoObj)
			},
			//接收todoObj的Id，以勾选或取消勾选
			checkTodo(id) {
				this.todos.forEach((todo) => {
					if (todo.id == id)
						todo.done = !todo.done
				})
			},
			//接收todoObj的Id，以删除
			deleteTodo(id) {
				this.todos.forEach((todo) => {
					if (todo.id == id)
						this.todos.pop(todo)
				})
			},
			//全部勾选、反选
			checkAll(done) {
				this.todos.forEach((todo) => {
					todo.done = done
				})
			},
			//清除已完成
			deleteAll() {
				this.todos = this.todos.filter((todo) => {
					return !todo.done
				})
			},
			//编辑
			editTodo(id, value) {
				this.todos.forEach((todo) => {
					if (todo.id == id)
						todo.title = value
				})
			}
		},
		watch: {
			//监视todos，进行本地存储
			todos: {
				//开启深度监视，监视是否勾选
				deep: true,
				handler(value) {
					localStorage.setItem("todos", JSON.stringify(value))
				}
			}
		},
		mounted() {
			//在全局事件总线上绑定checkTodo事件
			this.$bus.$on("checkTodo", this.checkTodo)
			//在全局事件总线上绑定deleteTodo事件
			this.$bus.$on("deleteTodo", this.deleteTodo)
			//在全局事件总线上绑定editTodo事件
			this.$bus.$on("editTodo", this.editTodo)
		},
		beforeDestroy() {
			//在全局事件总线上解绑checkTodo事件
			this.$bus.$off("checkTodo")
			//在全局事件总线上解绑deleteTodo事件
			this.$bus.$off("deleteTodo")
			//在全局事件总线上解绑editTodo事件
			this.$bus.$off("editTodo")
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
