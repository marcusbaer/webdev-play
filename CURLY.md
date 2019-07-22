## Do things with CURL or in your browser

```

curl wttr.in/Köln
curl http://de.wttr.in/:help
curl http://de.wttr.in/Köln
curl wttr.in/Köln -H "Accept-Language: de"
curl wttr.in/Wuppertal?lang=de
curl wttr.in/Moon
curl wttr.in/{Barcelona,Paris,Moscow}?format=3
curl wttr.in/{Barcelona,Paris,Moscow}?format=%l:+%c+%t,+%w+%m

diff -Naur <(curl -s http://wttr.in/london ) <(curl -s http://wttr.in/new-york )

curl cheat.sh/$where
curl cheat.sh/js/date+format
curl cheat.sh/latency

curl http://qrenco.de/https://docmorris.de

curl http://eur.rate.sx/
curl rate.sx/btc

```

