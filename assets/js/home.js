setActivePage('nav_home');
document.getElementById('stats-generator').click();

if(document.querySelector('.jscolor').value == '000000'){
  document.getElementById('off-button').classList.add('disabled');
  document.getElementById('set-default-button').classList.add('disabled');
}
else{
  document.getElementById('off-button').classList.remove('disabled');
  document.getElementById('set-default-button').classList.remove('disabled');
}

function submit(setDefault=false, useDefault=false, turnOff=false){
  if(setDefault){
    document.getElementById('set-as-default').checked = true;
  }
  if(useDefault){
    document.getElementById('change-to-default').checked = true;
  }
  if(turnOff){
    document.getElementById('turn-off').checked = true;
  }
  document.getElementById('color-form').submit();
}


//window.onload = function() {  
  function analyse(temperatureData, humidityData, onData){
    var temperatureRenderData = {
      datasets: [{
        data: temperatureData,
        backgroundColor:  ['#13763f', '#54a06b', '#b3d264'],
      }],
      labels: ['Hot', 'Comfortable', 'Cold']
    };

    var humidityRenderData = {
      datasets: [{
        data: humidityData,
        backgroundColor:  ['#13763f', '#54a06b', '#b3d264'],
      }],
      labels: ['Wet', 'Comfortable', 'Dry']
    };
    var onRenderData = {
      datasets: [{
        data: onData,
        backgroundColor:  ['#b3d264', '#13763f'],
      }],
      labels: ['On', 'Off']
    };

    renderChart(document.getElementById('temperature-chart'), temperatureRenderData);
    renderChart(document.getElementById('humidity-chart'), humidityRenderData);
    renderChart(document.getElementById('on-chart'), onRenderData);
  }
  function renderChart(ctx, data){
    var myDoughnutChart = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: {
        legend: {
          display: false,
        }
      }
    });
  }
  
//}
