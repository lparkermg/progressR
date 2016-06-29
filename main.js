requirejs.config({
  paths: {
    text: "libs/text"
  }
});

require(['libs/knockout'],
function(ko){
  ko.components.register('app', {
    viewModel: { require: 'components/App/app' },
    template: { require: 'text!components/App/app.html'}
  });

  ko.components.register('graph',{
    viewModel: { require: 'components/Graph/graph' },
    template: { require: 'text!components/Graph/graph.html' }
  });

  $(document).ready(function() {
    ko.applyBindings();
  });
});
