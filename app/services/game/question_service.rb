# frozen_string_literal: true

module Game
  class QuestionService
    include SessionConstants

    def initialize(session:)
      @session = session
      @serie = SerieService.new(session:)
    end

    def create_question
      # TODO: move in a difficulty service or something
      left = rand(0..10)
      right = rand(0..10)
      operator = :*
      answer = left.public_send(operator, right)

      @session[LEFT_OPERAND_KEY] = left
      @session[OPERATOR_KEY] = operator
      @session[RIGHT_OPERAND_KEY] = right
      @session[ANSWER_KEY] = answer.to_s
      @session[IS_COMPLETE_KEY] = false

      @session[ALL_ANSWERS_KEY] = [
        answer,
        rand(([answer - 10, 1].max)..(answer + 10)),
        rand(([answer - 10, 1].max)..(answer + 10)),
        rand(([answer - 10, 1].max)..(answer + 10))
      ].shuffle
    end

    def question_in_progress?
      @session[IS_COMPLETE_KEY]
    end

    def update_score_with_answer(value)
      if @session[ANSWER_KEY] == value
        on_right_answer
      else
        on_wrong_answer
      end

      update_score

      @session[IS_COMPLETE_KEY] = true
    end

    def series_ended?
      @serie.ended?
    end

    def reset
      @session[SERIES_COUNT_KEY] = 0
      @session[SCORE_KEY] = 0
      @session[GAME_LOST_KEY] = false
      @session[IS_COMPLETE_KEY] = false

      @serie.reset
    end

    private

    def on_right_answer
      @serie.next
    end

    def on_wrong_answer
      @session[GAME_LOST_KEY] = true
    end

    def update_score
      @serie.update_score
    end
  end
end
