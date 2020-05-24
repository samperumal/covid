<template>
	<section>
		<div class="container has-text-centered">
			<router-link to="frailty">Begin Frailty Assessment</router-link>
		</div>
	</section>
</template>

<script>
export default {
	data() {
		return {
			fsm: this.resetData()
		}
	},
	methods: {
		resetData() {
			return {
				
			}
		}
	},
	mounted() {		
		this.fsm = this.resetData()
	}
}
</script>