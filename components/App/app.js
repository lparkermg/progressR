define(
  ['libs/knockout'],
  function(ko) {
    //Register components here.
    ko.components.register('new-graph', {
      viewModel: { require: 'components/Graph/NewGraph/newGraph'},
      template: { require: 'text!components/Graph/NewGraph/newGraph.html'}
    });

    return function(){
      var self = this;

      self.showMenu = ko.observable(false);
      self.showAddData = ko.observable(false);

      self.showGraphWindow = ko.observable(false);
      self.isEditing = ko.observable(false);

      //Data stuff.
      self.selectedGraphs = ko.observableArray([]);
      self.graphData = ko.observableArray([]);

      self.messagesSuccess = ko.observableArray([]);
      self.messagesError = ko.observableArray([]);

      //Menu Actions
      self.toggleSubMenu = function(){
        if(self.showMenu()){
          self.showMenu(false);
        }
        else{
          self.showMenu(true);
        }
      };

      self.addNewGraph = function(){
        self.showGraphWindow(true);
        self.isEditing(false);
      };

      self.editSelectedGraph = function(){
        self.showGraphWindow(true)
        self.isEditing(true);
      };

      self.closeGraphWindow = function(){
        self.showGraphWindow(false);
      };

      function loadGraphs(){
        var getRequest = new XMLHttpRequest();
        getRequest.open('GET','/graphs', true);
        getRequest.setRequestHeader('Accept','application/json');

        getRequest.onload = function(){
          if(this.status >= 200 && this.status < 400){
            var data = JSON.parse(this.response);
            self.graphData(data);
          }
          else{
            self.messagesError.push("Error: Could not load the graphs. (" + this.responseText + ")");
          }
        };

        getRequest.onerror = function(){

        };

        getRequest.send();
      }

      loadGraphs();
    };
  }
);
