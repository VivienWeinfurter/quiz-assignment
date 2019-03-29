import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuestionPage } from '../question/question';

@IonicPage()
@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html',
})
export class SummaryPage {
  
  readonly imagePath: string = "../assets/imgs/";
  
  correctAnswerCounter: number;
  questions: any;
  correctness: number;
  tStart: any;
  tEnd: any;
  duration: number;
  feedback: string;
  resultImage: string;
  imgSize: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.getData();
    this.setResult();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SummaryPage');
  }
  
  getData() {
    this.correctAnswerCounter = this.navParams.get('correctAnswerCounter');
    this.questions = this.navParams.get('questions');
    this.correctness = (this.correctAnswerCounter/ this.questions.length) * (100);
    this.tStart = this.navParams.get('tStart');
    this.tEnd = this.navParams.get('tEnd');
    this.duration = Math.abs(this.tEnd - this.tStart) / 1000;
  }
  
  
  setResult() {
    let timePerQuestion = this.questions.length * 20;

    if (this.duration <= timePerQuestion && this.correctness == 100){
      this.feedback = 'Perfect! You are thinking really fast!';
      this.resultImage = this.imagePath + "brain-winner.svg";
      this.imgSize = 900;
    }
    if (this.duration > timePerQuestion && this.correctness == 100) {
      this.feedback = 'Good! You knew everything, but could have been faster...';
      this.resultImage = this.imagePath + "brain-winner.svg";
      this.imgSize = 500;
    }
    if (this.duration > timePerQuestion || this.duration < timePerQuestion && this.correctness < 100) {
      this.feedback = 'You are doing good! Just need more practice.';
      this.resultImage = this.imagePath + "brain-winner.svg";
      this.imgSize = 250;
    }
    if (this.duration >= timePerQuestion || this.duration <= timePerQuestion && this.correctness < 50) {
      this.feedback = 'Upps...Your brain does not really work fast...better to use it more often! ';
      this.resultImage = this.imagePath + "brain-train.svg";
      this.imgSize = 500;
    }
  }
  
  startAgain(){
    this.navCtrl.push(QuestionPage);
  }

}
