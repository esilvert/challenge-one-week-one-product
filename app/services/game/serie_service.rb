# frozen_string_literal: true

module Game
  class SerieService
    include SessionConstants

    def initialize(session:)
      @session = session
    end

    def ended?
      @session[GAME_LOST_KEY]
    end

    def next
      @session[SERIES_COUNT_KEY] ||= 0
      @session[SERIES_COUNT_KEY] += 1
    end

    def reset
      @session[SERIES_COUNT_KEY] = 0
    end

    def update_score
      @session[SCORE_KEY] = @session[SERIES_COUNT_KEY] * 123
    end
  end
end
