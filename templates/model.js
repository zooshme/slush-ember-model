define([
	'start'
], function() {
	App.<%= modelName %> = DS.Model.extend({
		<% _.forEach(modelAttributes, function(item) { %>
			<%= item.key %>: DS.attr("<%= item.value %>"),
		<% }) %>
	});
});