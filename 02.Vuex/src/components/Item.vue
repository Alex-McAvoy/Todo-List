<template>
	<li>
		<label>
			<input type="checkbox" :checked="itemObj.done" @change="handleCheck(itemObj.id)" />
			<span v-show="!itemObj.isEdit">{{itemObj.title}}</span>
			<input type="text" v-show="itemObj.isEdit" :value="itemObj.title" @blur="handleBlur(itemObj,$event)"
				ref="inputTitle" />
		</label>
		<button class="btn btn-danger" @click="handleDelete(itemObj.id)">删除</button>
		<button v-show="!itemObj.isEdit" class="btn btn-edit" @click="handleEdit(itemObj)">编辑</button>
	</li>
</template>

<script>
	import {
		mapActions
	} from "vuex";

	export default {
		name: "Item",
		props: ["itemObj"],
		methods: {
			//借助mapActions生成对应的方法，会调用dispatch去联系actions
			...mapActions({
				handleCheck: "checkById",
				handleDelete: "deleteById"
			}),

			//点击编辑按钮对组件进行编辑
			handleEdit(itemObj) {
				itemObj.isEdit = true;

				//nextTick的回调会在下一次dom结点更新完毕执行
				this.$nextTick(function() {
					//获取焦点
					this.$refs.inputTitle.focus();
				});
			},
			//失去焦点完成编辑
			handleBlur(itemObj, event) {
				itemObj.isEdit = false;

				let value = event.target.value;
				if (!value.trim()) {
					return alert("输入不能为空！");
				}

				this.$store.dispatch("editById", {
					id: itemObj.id,
					value: value
				});
			}
		},
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
