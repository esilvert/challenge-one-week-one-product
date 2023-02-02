# frozen_string_literal: true

class LeaderboardsController < ApplicationController
  layout 'game'

  def home
    @players = Player.order(score: :desc).limit(100)
  end
end
