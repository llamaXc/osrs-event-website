# OSRSEvents Website Installtion

1. Install Docker: `https://docs.docker.com/get-docker/`

2. Clone repo `git clone https://github.com/llamaXc/osrs-event-website.git`

3. Run `docker compose build`

4. Run `docker compose up`

5. Visit the test endpoint in your browser at: `localhost:3000/api-unauth` and ensure you see some JSON output.

6. Visit the test frontend in your browser at: `localhost:5000/` and ensure you see a webpage.


## Wait, where does all this data for Runescape come from?
There is a Runelite plugin called `OSRSEvents` source code here: https://github.com/llamaXc/osrs-events
It will publish various events via HTTP POST requests to a user defined endpoint in the plugin.
