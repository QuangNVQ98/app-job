import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  type = 'doughnut';
  data = {
    labels: [
      'Chờ chấm điểm', 'Không đạt', 'Đạt', 'Được nhận'
    ],
    datasets: [{
      data: [40, 10, 40, 10],
      backgroundColor: [
        '#F9B548',
        '#FA6D82',
        '#47C154',
        '#6BA7EB'
      ],
      borderWidth: [
        '0px',
        '0px',
        '0px',
        '0px'
      ],
      borderColor: [
        '#F9B548',
        '#FA6D82',
        '#47C154',
        '#6BA7EB'
      ]
    }]
  };

  constructor() { }

  ngOnInit(): void {
  }

}
