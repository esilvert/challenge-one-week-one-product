# frozen_string_literal: true

class GamesController < ApplicationController
  layout 'game'

  NB_ANSWERS_TO_WIN = 3

  def splash
    Game::QuestionService.new(session:).reset
  end

  def play
    Game::QuestionService.new(session:).tap do |service|
      service.create_question unless service.question_in_progress?
    end
  end

  def restart
    Game::QuestionService.new(session:).reset

    render :splash
  end

  def answer
    question_service = Game::QuestionService.new(session:).tap do |service|
      service.update_score_with_answer(params[:value])
      service.create_question
    end

    redirect_to lose_screen_path and return if question_service.series_ended?

    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: turbo_stream.replace(
          'game',
          partial: 'games/play_content'
        )
      end
    end
  end

  def lost
    respond_to do |format|
      format.html {}
      format.turbo_stream do
        render turbo_stream: turbo_stream.replace(
          'game',
          partial: 'games/lost_content'
        )
      end
    end
  end
end
