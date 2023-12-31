# frozen_string_literal: true

class GamesController < ApplicationController
  layout 'game'

  def splash
    Game::QuestionService.new(session:).reset
  end

  def new; end

  def create
    player = Player.create(**create_params)

    Game::QuestionService.new(session:).reset

    session[:id] = player.id
    session[:name] = player.name
    warn "\e[101m[#{Time.now}]\t #{__FILE__}::#{__LINE__}:\e[93m ID: #{session[:id]} \e[0m"

    redirect_to inter_path
  end

  def create_params
    params.permit(:name)
  end

  def play
    Game::QuestionService.new(session:).tap do |service|
      service.create_question unless service.question_in_progress?
    end
  end

  def inter; end

  def restart
    Game::QuestionService.new(session:).reset

    if !session[:name]
      redirect_to new_game_path
    else
      redirect_to inter_path
    end
  end

  def answer
    question_service = Game::QuestionService.new(session:).tap do |service|
      service.update_score_with_answer(params[:value], timebank: params[:tb])
      service.create_question
    end

    redirect_to lost_path and return if question_service.series_ended?

    respond_to do |format|
      format.turbo_stream do
        if !question_service.was_wrong? && question_service.show_message?
          render turbo_stream: turbo_stream.replace(
            'game',
            partial: 'games/inter_content'
          )
        else
          render turbo_stream: turbo_stream.replace(
            'game',
            partial: 'games/play_content'
          )
        end
      end
    end
  end

  def lost
    Player.find(session[:id]).update!(score: session[SessionConstants::SCORE_KEY])

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
