define(
  ['libs/knockout'],
  function(ko) {
    return function(params){
      var self = this;

      self.graphTitle = ko.observable("");
      self.graphDescription = ko.observable("");
      self.graphMaxValue = ko.observable("");
      self.graphCurrentValue = ko.observable("");
      self.graphData = params.graphs || ko.observableArray([]);
      self.messagesSuccess = ko.observableArray([]);
      self.messagesError = ko.observableArray([]);
      console.log(self.graphData());
      self.saveNewGraph = function(){
        var newData = {
          title: self.graphTitle(),
          description: self.graphDescription(),
          maxValue: self.graphMaxValue(),
          currentValue: self.graphCurrentValue()
        };
        self.graphData.push(newData);
        saveGraphData(self.graphData(),false);
      };

      function saveGraphData(graphData,removedGraph){
        var jsonString = JSON.stringify(graphData)
        var saveRequest = new XMLHttpRequest();
        saveRequest.open('POST','/graphs',true);
        saveRequest.setRequestHeader('Content-type','application/json');

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

        console.log(jsonString);
        saveRequest.send(jsonString);
      }
    };
  }
);
