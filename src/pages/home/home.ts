import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QuestionPage } from '../question/question';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

/**
 * @author Vivien Weinfurter <k8wevi00@students.oamk.fi>
 */

export class HomePage {

  constructor(public navCtrl: NavController) {
  }
  
  startQuiz() {
    this.navCtrl.push(QuestionPage);
  }

}
