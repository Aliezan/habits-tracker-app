import { gql } from "@apollo/client";

export const ADD_HABIT = gql`
  mutation CreateHabit
  ($habit_name: String!, $habit_goal: String!, $habit_deadline: timestamptz!, $habit_frequency: Int!, $habit_deadline_in_day: Int!) {
    insert_habits_one(object: {
      habit_name: $habit_name,
      habit_goal: $habit_goal,
      habit_deadline: $habit_deadline,
      habit_frequency: $habit_frequency,
      habit_deadline_in_day: $habit_deadline_in_day
    }) {
      id
    }
  }
`;

export const GET_HABITS_NAME_SUBSCRIPTION = gql`
subscription GetHabits {
  habits(limit: 3, order_by: {id: desc}) {
    habit_name
    id
  }
}
`;

export const GET_MORE_HABITS_NAME = gql`
subscription GetMoreHabits {
  habits(order_by: {id: desc}) {
    habit_name
    habit_goal
    id
  }
}
`;

export const GET_HABITS_BY_ID = gql`
subscription GetHabits($_eq: Int!) {
  habits(where: {id: {_eq: $_eq}}) {
  	id
    habit_goal
    habit_name
    habit_deadline
    habit_frequency
    habit_deadline_in_day
  }
}
`;

export const GET_HABITS_GOAL_SUBSCRIPTION = gql`
subscription GetHabits {
habits (limit: 3, order_by: {id: desc}){
  habit_goal
  id
  }
}
`;

export const GET_MORE_HABITS_GOAL = gql`
query GetMoreHabits {
  habits(order_by: {id: desc}) {
    habit_goal
    id
  }
}
`;

export const ADD_HABIT_LOG = gql`
  mutation CreateHabitLog($habit_id: Int!) {
    insert_habit_log_one(object: {
      habit_id: $habit_id,
  }) 
  {
      id
  }
  }
  `;

export const GET_HABIT_LOGS_SUBSCRIPTION = gql`
subscription GetHabitLogs {
  habit_log (limit: 3) {
    habit_id
  }
}
`;
export const GET_HABIT_ID_COUNT = gql`
subscription GetHabitIdCount {
  habits(limit: 3, order_by: {id: desc}) {
    id
    habit_goal
    habit_deadline_in_day
    habit_deadline
    habit_logs {
      habit_id
    }
  }
}`;

export const GET_MORE_HABIT_ID_COUNT = gql`
query GetMoreHabitIdCount {
  habits(order_by: {id: desc}) {
    id
    habit_goal
    habit_deadline_in_day
    habit_logs {
      habit_id
    }
  }
}
`;

export const GET_TODAY_COMPLETED_HABITS = gql`
subscription GetCompletedTodaysHabit($_eq: date!) {
  habits(order_by: {id: desc}) {
    id
    habit_name
    habit_logs(where: {date_of_completion: {_eq: $_eq }}) {
      habit_id
      date_of_completion
    }
  }
}
`;

export const UPDATE_HABITS = gql`
mutation updateHabits($id: Int!, $habit_deadline: timestamptz!, $habit_deadline_in_day: Int!, $habit_frequency: Int!, $habit_goal: String!, $habit_name: String!) {
  update_habits_by_pk(
    pk_columns: {id: $id}, 
    _set: {
      habit_deadline: $habit_deadline, 
      habit_deadline_in_day: $habit_deadline_in_day, 
      habit_frequency: $habit_frequency, 
      habit_goal: $habit_goal, 
      habit_name: $habit_name,
      id: $id
      }
      ) {
    id
  }
}`;

export const DELETE_HABIT = gql`
mutation DeleteHabit($_eq: Int!, $id: Int!) {
  delete_habit_log(where: {habit_id: {_eq: $_eq}}) {
    affected_rows
  }
  delete_habits_by_pk(id: $id) {
    habit_deadline
    habit_deadline_in_day
    habit_frequency
    habit_goal
    habit_name
    id
    habit_logs(where: {habit_id: {_eq: $_eq}}) {
      date_of_completion
      habit_id
    }
  }
}`;

export const ADD_FINISHED_HABITS = gql`
mutation CreateFinishedHabits
  ($habit_name: String!, $habit_goal: String!, $habit_deadline: timestamptz!, $habit_frequency: Int!, $habit_deadline_in_day: Int!) {
    insert_finished_habits_one(object: {
      habit_name: $habit_name,
      habit_goal: $habit_goal,
      habit_deadline: $habit_deadline,
      habit_frequency: $habit_frequency,
      habit_deadline_in_day: $habit_deadline_in_day
    }) {
      id
    }
  }
`;

export const GET_FINISHED_HABITS_SUBSCRIPTION = gql`
subscription GetFinishedHabits {
  finished_habits(limit: 3, order_by: {id: desc}) {
    id
    habit_name
    habit_goal
  }
}
`;

export const GET_MORE_FINISHED_HABITS = gql`
subscription GetFinishedHabits {
  finished_habits (order_by: {id: desc}) {
    id
    habit_name
    habit_goal
  }
}
`;