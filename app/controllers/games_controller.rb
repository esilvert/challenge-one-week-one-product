# frozen_string_literal: true

class GamesController < ApplicationController
  layout 'game'

  def splash; end

  def play; end

  def answer
    session[:series] ||= 0
    session[:series] += 1

    if session[:series] >= 10
      redirect_to lose_screen_path
      return
    end

    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: turbo_stream.replace(
          'game',
          partial: 'games/play_content'
        )
      end
    end
  end

  def lost; end
end
