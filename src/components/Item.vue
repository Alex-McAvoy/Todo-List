<template>
	<li>
		<label>
			<input type="checkbox" :checked="item.done" @change="handleCheck(item.id)" />
			<span v-show="!item.isEdit">{{item.title}}</span>
			<input v-show="item.isEdit" type="text" :value="item.title" @blur="handleBlur(item,$event)"
				ref="inputTitle" />
		</label>
		<button class="btn btn-danger" @click="handleDelete(item.id)">删除</button>
		<button v-show="!item.isEdit" class="btn btn-edit" @click="handleEdit(item)">编辑</button>
	</li>
</template>

<script>
	export default {
		name: "Item",
		//声明接收itemObj对象
		props: ["item"],
		methods: {
			//通知App.vue将对应组件checkbox取反
			handleCheck(id) {
				//触发全局总线上的checkTodo事件
				this.$bus.$emit("checkTodo", id)
			},
			//通知App.vue将对应组件删除
			handleDelete(id) {
				if (confirm("是否删除？")) {
					//触发全局总线上的deleteTodo事件
					this.$bus.$emit("deleteTodo", id)
				}
			},
			//编辑对应item
			handleEdit(item) {
				item.isEdit = true
				
				//nextTick的回调会在下一次dom结点更新完毕执行
				this.$nextTick(function(){
					//获取焦点
					this.$refs.inputTitle.focus()
				})
			},
			//失去焦点完成编辑
			handleBlur(item, event) {
				item.isEdit = false

				let value = event.target.value
				if (!value.trim())
					return alert("输入不能为空！")

				//触发全局总线上的editTodo事件
				this.$bus.$emit("editTodo", item.id, event.target.value)
			}
		}
	}
</script>

<style scoped>
	/*item*/
	li {
		list-style: none;
		height: 36px;
		line-height: 36px;
		padding: 0 5px;
		border-bottom: 1px solid #ddd;
	}

	li label {
		float: left;
		cursor: pointer;
	}

	li label li input {
		vertical-align: middle;
		margin-right: 6px;
		position: relative;
		top: -1px;
	}

	li button {
		float: right;
		display: none;
		margin-top: 3px;
	}

	li:before {
		content: initial;
	}

	li:last-child {
		border-bottom: none;
	}

	li:hover {
		background-color: #ddd;
	}

	li:hover button {
		display: block;
	}
</style>
