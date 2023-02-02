# frozen_string_literal: true

module GamesHelper
  GAME_SCENE_PATHS = %w[
    /play
    /inter
    /restart
    /lose-screen
  ].freeze

  def session_constants
    SesssionConstants
  end

  def is_game_scene?
    GAME_SCENE_PATHS.include?(request.path)
  end
end
