# frozen_string_literal: true

module Game
  class SerieService
    include SessionConstants

    SUCCESS_ADDED_TIME = 500
    FAILED_REMOVED_TIME = 5000
    INITIAL_TIMEBANK = 60_000
    UNLIMITED_MODE_THRESHOLD = 70

    def initialize(session:)
      @session = session
    end

    def ended?
      @session[GAME_LOST_KEY]
    end

    def show_message?
      (@session[SERIES_COUNT_KEY] % 10).zero? && @session[SERIES_COUNT_KEY] < UNLIMITED_MODE_THRESHOLD
    end

    def update_timebank(tb)
      @session[TIMEBANK_KEY] = tb unless tb > @session[TIMEBANK_KEY]
    end

    def on_success
      @session[SERIES_COUNT_KEY] ||= 0
      @session[SERIES_COUNT_KEY] += 1
      @session[CURRENT_SERIE_KEY] += 1

      @session[CURRENT_SERIE_KEY] = 0 if show_message?

      @session[TIMEBANK_KEY] ||= 0
      @session[TIMEBANK_KEY] += SUCCESS_ADDED_TIME
    end

    def on_error
      @session[TIMEBANK_KEY] -= FAILED_REMOVED_TIME
      @session[CURRENT_SERIE_KEY] = 0

      @session[GAME_LOST_KEY] = true if @session[TIMEBANK_KEY].negative?
    end

    def reset
      @session[SERIES_COUNT_KEY] = 0
      @session[TIMEBANK_KEY] = INITIAL_TIMEBANK
      @session[CURRENT_SERIE_KEY] = 0
      @session[SCORE_KEY] = 0
    end

    def update_score
      @session[SCORE_KEY] += @session[TIMEBANK_KEY] / 100 * @session[SERIES_COUNT_KEY] / 10.0
    end

    def generate_number
      case serie_length
      when 0...10
        rand(1..10) # +
      when 10...20
        rand(1..10) # -
      when 20...30
        rand(1..10) # *
      when 30...40
        rand(1..10) # + -
      when 40...30
        rand(1..10) # + - *
      when 40...50
        rand(1..20) # + -
      else
        rand(1..20) # + - *
      end
    end

    def generate_operator
      case serie_length
      when 0...10
        %i[+].sample
      when 10...20
        %i[-].sample
      when 20...30
        %i[*].sample
      when 30...40
        %i[+ -].sample
      when 40...50
        %i[+ - *].sample
      when 50...60
        %i[+ -].sample
      else
        %i[+ - *].sample
      end
    end

    private

    def serie_length
      @session[SERIES_COUNT_KEY]
    end
  end
end
