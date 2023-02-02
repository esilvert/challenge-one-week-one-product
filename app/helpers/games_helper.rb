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

  def right_answer?(answer)
    answer.to_s == session[SessionConstants::ANSWER_KEY]
  end

  def action_for_answer(answer)
    result = { action: 'click->sounds#play' }

    result['sounds-id-param'] = if right_answer?(answer)
                                  'success'
                                else
                                  'error'
                                end

    result
  end
end
