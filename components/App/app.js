define(
  ['libs/knockout'],
  function(ko) {
    //Register components here.


    return function(){
      var self = this;

      self.showMenu = ko.observable(false);
      self.showAddData = ko.observable(false);

      self.showGraphWindow = ko.observable(false);
      self.isEditing = ko.observable(false);

      //Data stuff.
      self.selectedGraphs = ko.observableArray([]);
      self.graphData = ko.observableArray([]);

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
      }
    };
  }
);
