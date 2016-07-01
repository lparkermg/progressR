define(
  ['libs/knockout'],
  function(ko) {
    return function(params){
      var self = this;

      

      self.messagesSuccess = ko.observableArray([]);
      self.messagesError = ko.observableArray([]);

      self.saveNewGraph = function(graphData){
        saveGraphData(self.graphData(),false);
      };

      function saveGraphData(graphData,removedGraph){
        var saveRequest = new XMLHttpRequest();
        saveRequest.open('PUT','/graphs',true);
        saveRequest.setRequestHeader('Accept','application/json');

        saveRequest.onload = function(){
          if(this.status >= 200 && this.status < 400){
            if(removedGraph){
              self.messagesSuccess.push("Success: Removed the selected graphs.");
            }
            else{
              self.messagesSuccess.push("Success: Added a new graph.");
            }
          }
          else {
            if(removedGraph){
              self.messagesError.push("Error: There was a problem removing the graph data.");
              console.log(this.responseText);
            }
            else{
              self.messagesError.push("Error: There was a problem saving the graph data.");
              console.log(this.responseText);
            }
          }
        };

        saveRequest.onerror = function(){
        };

        saveRequest.send(JSON.stringify(graphData));
      }
    };
  }
);
