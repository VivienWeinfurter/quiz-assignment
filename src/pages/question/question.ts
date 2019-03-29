import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { QuestionsProvider } from '../../providers/questions/questions';
import { ThinkingQuestion } from '../../thinkingquestion';
import { SummaryPage } from '../summary/summary';


@IonicPage()
@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage {
  
  questions: ThinkingQuestion[]= [];
  activeQuestion: ThinkingQuestion;
  feedback: string;
  isCorrect: boolean;
  questionCounter: number = 0;
  optionCounter: number = 1;
  correctAnswerCounter: number = 0;
  tStart: any;
  tEnd: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private questionsProvider: QuestionsProvider) {
    this.tStart = new Date();
    console.log(this.tStart);
  }
 
  ionViewDidLoad(){
   this.questionsProvider.getJSON().then(data => {
      this.questions = data["questions"];
      this.questionCounter = 0;
      this.setQuestion();
    }, error => {
      console.log(error);
    });
  }
  
  setQuestion() {
    if (this.questionCounter == this.questions.length) {
      this.tEnd = new Date();
      console.log(this.tEnd);
      this.goToSummary();
      this.questionCounter = 0;
      this.correctAnswerCounter = 0;
    }
    this.optionCounter = 1;
    this.feedback = '';
    this.isCorrect = false;
    this.activeQuestion = this.questions[this.questionCounter];
    this.questionCounter++;
  }
  
  checkOption(option, activeQuestion) {
    this.optionCounter++;
    if (this.optionCounter > activeQuestion.options.length) {
      this.setQuestion();
    }
    if (option == activeQuestion.correctOption) {
      this.feedback = this.activeQuestion.feedback;
      this.isCorrect = true;
      this.correctAnswerCounter++;
    }
    else {
      this.feedback = 'Inncorrect - Better to think faster.';
      this.isCorrect = false;
    }
  }
  
  goToSummary() {
    this.navCtrl.push(SummaryPage, {
      // key: value
      correctAnswerCounter: this.correctAnswerCounter, 
      questions: this.questions,
      tStart: this.tStart, 
      tEnd: this.tEnd
    });
  }

}
