export interface HelloMessage {
  name: string;
  text: string;
};

export interface HelloMessageResult {
  message: HelloMessage;
};

export interface HelloTestData extends HelloMessageResult{
  error: {
    code: string,
    description: string,
  },
};

