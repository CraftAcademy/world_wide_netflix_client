import React, {useState} from 'react';
import LoginModal from './LoginModal';
import { Container, Header, Segment, Form, Button } from 'semantic-ui-react';
import BecomeSubscriber from './BecomeSubscriber';
import { Elements } from 'react-stripe-elements';

const HeaderMainPage = (props) => {
	const [authenticated, setAuthenticated] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

	const onSubmit = (event) => {
    event.preventDefault();
    props.setQuery(event.target.search.value);
  };

  return (
    <div data-cy='header'>
      <Segment inverted style={{ borderRadius: 0 }}>
        <Header textAlign='center' size='huge' color='red' inverted>
          World Wide Netflix
        </Header>
        <Header textAlign='center'>
          Tired of watching the choice Netflix gives you, check out what is
          available around the globe!
        </Header>
        {!authenticated && <LoginModal subscribed={subscribed} setQuery={props.setQuery} setUpdate={props.setUpdate} setAuthenticated={setAuthenticated}/>}
        {(authenticated && !subscribed) && (
          <Elements>
            <BecomeSubscriber setMessage={props.setMessage} setSubscribed={setSubscribed}/>
          </Elements>
        )}
				<Container position='centered'>
        {subscribed && <Form onSubmit={(event) => onSubmit(event)}>
          <Form.Input
            type='text'
            name='search'
            placeholder='Search Movie...'
            data-cy='search-input'
          />
          <Button type='submit' data-cy='search-btn'>
            Search
          </Button>
        </Form>}
      </Container>
      </Segment>
    </div>
  );
};

export default HeaderMainPage;
