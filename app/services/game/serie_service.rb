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

    def generate_number
      case serie_length
      when 0...10
        rand(1..10)
      when 10...20
        rand(1..10)
      when 20...30
        rand(1..10)
      when 30...40
        rand(1..20)
      when 40...50
        rand(1..20)
      when 50...60
        rand(1..20)
      else
        rand(1..20)
      end
    end

    def generate_operator
      case serie_length
      when 0...10
        %i[+].sample
      when 10...20
        %i[-].sample
      when 20...30
        %i[+ -].sample
      when 30...40
        %i[+ -].sample
      when 40...50
        %i[*].sample
      when 50...60
        %i[*].sample
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
