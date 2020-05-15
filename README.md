# room
A nextJS server that servers a React component for visualizing twitch clips, similar to what's on twitch.tv

![twitch](https://user-images.githubusercontent.com/26607946/82077590-ff1a2b80-96df-11ea-94f4-28fed6215d15.gif)

## usage
As twitch needs both a client id and a client secret to make requests to its REST api, you need to create a developer account first. Then you need to generate the credentials and put them in a `secret.json` at the root of the project like so :

```json
{
  "client_id": <my client id>,
  "client_secret": <my client secret>
}
```
