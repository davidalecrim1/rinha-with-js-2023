# Change Log
All notable changes to this project will be documented in this file.
 
The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).
 
## [v0.0.1] - 2024-11-22
 
Here is the first registered version.

- **/contagem-pessoas** -> 21921
- **Gatling output**: rinhabackendsimulation-20241122220517444
- **commit**: d57025cfa819d27b4534fe4ad731b04de3af2771

```
================================================================================
---- Global Information --------------------------------------------------------
> request count                                      74807 (OK=18843  KO=55964 )
> min response time                                      0 (OK=1      KO=0     )
> max response time                                  60009 (OK=57798  KO=60009 )
> mean response time                                  2161 (OK=8567   KO=4     )
> std deviation                                       6291 (OK=10093  KO=359   )
> response time 50th percentile                          1 (OK=4374   KO=1     )
> response time 75th percentile                         23 (OK=12029  KO=1     )
> response time 95th percentile                      14125 (OK=31870  KO=3     )
> response time 99th percentile                      32714 (OK=42595  KO=16    )
> mean requests/sec                                 323.84 (OK=81.571 KO=242.268)
---- Response Time Distribution ------------------------------------------------
> t < 800 ms                                          3220 (  4%)
> 800 ms <= t < 1200 ms                                748 (  1%)
> t >= 1200 ms                                       14875 ( 20%)
> failed                                             55964 ( 75%)
---- Errors --------------------------------------------------------------------
> j.i.IOException: Premature close                                47838 (85.48%)
> status.find.in(201,422,400), but actually found 502              5016 ( 8.96%)
> status.find.in([200, 209], 304), found 502                       1195 ( 2.14%)
> status.find.in(201,422,400), but actually found 500              1125 ( 2.01%)
> status.find.is(400), but actually found 502                       356 ( 0.64%)
> status.find.in([200, 209], 304), found 500                        333 ( 0.60%)
> status.find.is(400), but actually found 500                        99 ( 0.18%)
> Request timeout to localhost/127.0.0.1:9999 after 60000 ms          2 ( 0.00%)
================================================================================
```


# [v0.0.2] - 2024-11-23
 
Changed:
- Amount of workers to 4, seems to work better.

Output:
- **/contagem-pessoas** -> 26768
- **Gatling output**: rinhabackendsimulation-20241123100657462
- **commit**: 32b787385a61194fdff8bd992d9b4d227171a2a1

```
================================================================================
---- Global Information --------------------------------------------------------
> request count                                      69817 (OK=5113   KO=64704 )
> min response time                                      0 (OK=1      KO=0     )
> max response time                                  60515 (OK=59995  KO=60515 )
> mean response time                                  2976 (OK=19294  KO=1686  )
> std deviation                                      10222 (OK=16286  KO=8311  )
> response time 50th percentile                          1 (OK=14515  KO=1     )
> response time 75th percentile                         19 (OK=27844  KO=5     )
> response time 95th percentile                      18749 (OK=52642  KO=7006  )
> response time 99th percentile                      60001 (OK=58443  KO=60001 )
> mean requests/sec                                297.094 (OK=21.757 KO=275.336)
---- Response Time Distribution ------------------------------------------------
> t < 800 ms                                           452 (  1%)
> 800 ms <= t < 1200 ms                                 67 (  0%)
> t >= 1200 ms                                        4594 (  7%)
> failed                                             64704 ( 93%)
---- Errors --------------------------------------------------------------------
> j.i.IOException: Premature close                                58007 (89.65%)
> status.find.in(201,422,400), but actually found 502              3103 ( 4.80%)
> Request timeout to localhost/127.0.0.1:9999 after 60000 ms       1182 ( 1.83%)
> status.find.in(201,422,400), but actually found 500              1059 ( 1.64%)
> status.find.in([200, 209], 304), found 502                        682 ( 1.05%)
> status.find.is(400), but actually found 502                       293 ( 0.45%)
> status.find.in([200, 209], 304), found 500                        275 ( 0.43%)
> status.find.is(400), but actually found 500                        91 ( 0.14%)
> status.find.in(201,422,400), but actually found 504                 6 ( 0.01%)
> status.find.in([200, 209], 304), found 503                          4 ( 0.01%)
> status.find.in(201,422,400), but actually found 503                 2 ( 0.00%)
================================================================================
```