$(function(){
    showInventory();
    showPassbook();
    drawPieChart();
})

function showPassbook(){
    $.ajax({'type':'POST', 'url':'stock-passbooks', beforeSend: function(){ $('#processing').removeClass('d-none'); }})
    .done(function(data, textStatus, jqXHR){
        var items = [];
        $.each(data, function(d){
            i = data[d];
            items.push(`
            <tr>
                <td>${i.date}</td>
                <td>${i.memo}</td>
                <td>${i.withdrawal}</td>
                <td>${i.deposit}</td>
                <td>${i.balance}</td>
                <td>${i.remarks}</td>
            </tr>`);
        })
        $('#passbooks tbody').html(items.join(''));
        
    })
    .fail(function(jqXHR, textStatus, errorThrown) { alertError(jqXHR.status); })
    .always(function(){ $('#processing').addClass('d-none'); });
}
function showInventory(){
    $.ajax({'type':'POST', 'url':'/stock-inventory',
        beforeSend: function(){$('#processing').removeClass('d-none');},
    })
    .done(function(data, textStatus, jqXHR){
        var colors = [
            '#b91d1d', '#4169e1', '#c71585', '#008b8b', '#ff8c00',
            '#4682b4', '#ba55d3', '#ff1493', '#2e8b57', '#3b3b3b'
        ];
        var colorIndex = 0;
        var items = [];
        var aryChartData = [];
        var aryTableData = [];
        var aryColors = [];
        var row = '';
        var svalue = '';
        $.each(data.inventory, function(stock){
            row = data.inventory[stock];
            console.log(i);
            
            svalue = parseInt(parseFloat(row.sprice) * parseInt(row.inv_num)) / 10.0;
            aryChartData.push([row.name, svalue]);
            aryTableData.push([row.name, svalue, row.roi]);
            // 設定顏色
            aryColors.push(colors[colorIndex]);
            colorIndex++;
            if (colorIndex == colors.length) {
                colorIndex -= 1;
            }

            items.push(`
            <tr id="rowid-${d}">
                <td>${d}</td>
                <td>${i.name}</td>
                <td>${i.inv_num}</td>
                <td>${i.sprice}</td>
                <td>${i.roi}</td>
            </tr>`);
        })
        $('#stock-inventory tbody').html(items.join(''));
        
    })
    .fail(function(jqXHR, textStatus, errorThrown) {alertError(jqXHR.status); })
    .always(function(){ $('#processing').addClass('d-none'); });
}
    //     for(var stock in data.inventory) {
    //         row = data.inventory[stock];
    //         // 單位：萬元
    //         svalue = parseInt(parseFloat(row.sprice) * parseInt(row.inv_num)) / 10.0;
    //         aryChartData.push([row.name, svalue]);
    //         aryTableData.push([row.name, svalue, row.roi]);
    //         // 設定顏色
    //         aryColors.push(colors[colorIndex]);
    //         colorIndex++;
    //         if (colorIndex == colors.length) {
    //             colorIndex -= 1;
    //         }
    //     }
    //     // a, b 各為一列資料
    //     // 依第 2 欄正負差異比較
    //     // a[1] - b[1]: 升冪排序
    //     // b[1] - a[1]: 降冪排序
    //     aryChartData.sort(function(a, b) { return b[1] - a[1]; });
    //     aryTableData.sort(function(a, b) { return b[1] - a[1]; });

    //     aryTableData.forEach(function(row, index) {
    //         row.unshift(aryColors[index]);
    //         items.push(`
    //         <tr>
    //             <td><span style="color:${row[0]};">●</td>
    //             <td>${row[1]}</td>
    //             <td>${row[2]}萬</td>
    //             <td>${row[3]}</td>
    //         </tr>`);
    //     });
    //     $('#tableAssets tbody').html(items.join(''));
    //     drawPieChart(aryChartData, aryColors);
    //     if (aryTableData.length == 0) {
    //         toastr.info('目前沒有任何資產');
    //     }
    //     else {
    //         // 不要在 #assets-stat 設定 d-none 樣式
    //         // 而是設定 style="display: none;"
    //         // 圖表淡出效果才有作用
    //         $('#assets-stat').fadeIn(2000);
    //     }
    // })
function getOrders(){
    $.ajax({'type': 'POST', 'url': '/get-orders',
        beforeSend: function(){ $('#processing').removeClass('d-none'); },
    })
    .done(function(data, textStatus, jqXHR){
        var items = [];
        data = data['orders']
        $.each(data, function(date){
            i = data[date];
            actName = i.ent_act == 'buy' ? '現股買進' : '現股賣出';
            items.push(`
            <tr>
                <td>${i.stockID}</td>
                <td>${i.stitle}</td>
                <td>${actName}</td>
                <td>${i.sprice}</td>
                <td>${i.entNum}</a></td>
                <td>${i.amount}</td>
                <td>${date}</td>
            </tr>`);
        })
        $('#orders tbody').html(items.join(''));
        
    })
    .fail(function(jqXHR, textStatus, errorThrown) { alertError(jqXHR.status); })
    .always(function(){ $('#processing').addClass('d-none'); });
}
function drawPieChart(aryChartData, aryColors) {
    // 圓餅圖
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart1);

    function drawChart1() {
        // 新增欄位
        aryChartData.unshift(['公司', '佔比']);
        var data = google.visualization.arrayToDataTable(aryChartData);
        var options = {
            // title: '資產總覽',
            colors: aryColors,
            legend: {position: 'top', textStyle: {color: 'black', fontSize: 14}},
            tooltip: {textStyle: {color: 'gray', fontSize: 16}, showColorCode: true}
        };
        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(data, options);
        // 移除欄位，否則影響長條圖
        aryChartData.shift();
    }
}
function draw() {
    google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(drawChart2);
    function drawChart2() {
        
        var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Work',     11],
        ['Eat',      2],
        ['Commute',  2],
        ['Watch TV', 2],
        ['Sleep',    7]
        ]);

        var options = {
        title: 'My Daily Activities',
        pieHole: 0.4,
        };

        var chart = new google.visualization.PieChart(document.getElementById('static'));
        chart.draw(data, options);
    }

}