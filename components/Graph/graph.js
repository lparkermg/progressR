define(
  ['libs/knockout'],
  function(ko) {
    return function(params){
      var self = this;

      self.graphTitle = ko.observable("");
      self.graphDescription = ko.observable("");
      self.graphMaxValue = ko.observable("");
      self.graphCurrentValue = ko.observable("");
      self.graphId = ko.observable("");

      self.graphTitle(params.data.title);
      self.graphDescription(params.data.description);
      self.graphMaxValue(params.data.maxValue);
      self.graphCurrentValue(params.data.currentValue);
      self.graphId("part-graph-" + params.index());
      loadGraph();
      function loadGraph(){
        var amountLeft = self.graphMaxValue() - self.graphCurrentValue();
        var currentValue = self.graphCurrentValue();
        var gId = self.graphId();
        console.log(gId);
        var ctx = document.getElementById(gId);
        console.log(ctx);
        var options = {
          cutoutPercentage:"50",
          animation:{
            animateRotate:true
          }
        };

        var data = {labels:["Amount Done","Amount Left"],
                    datasets:[{
                      data:[currentValue, amountLeft],
                          backgroundColor:["#6666dd","#eeeeee"],
                          hoverBackgroundColor:["#6666ff","#fcfcfc"]
                          }
                        ]
                    };
        var newDoughnutChart = new Chart(ctx,{
          type: 'doughnut',
          data: data,
          options:options
        });
      }
    };
  }
);
