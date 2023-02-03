# frozen_string_literal: true

class LeaderboardsController < ApplicationController
  layout 'game'

  def home
    @players = Player.order(score: :desc).limit(100)
    @player = Player.find(session[:id])

    @is_ranked = @players.select { |p| p.id == session[:id] }
    @position = Player.order(score: :desc).pluck(:id).find_index(session[:id]) + 1 unless @is_ranked
  end
end
