# frozen_string_literal: true

class GamesController < ApplicationController
  def splash; end

  def play; end

  def answer
    session[:series] ||= 0
    session[:series] += 1

    if session[:series] >= 10
      redirect_to lose_screen_path
      return
    end

    redirect_to play_path
  end

  def lost; end
end
