import React, { useState, useEffect } from "react";
import tmaName from "../functions/tmaName";
import getMonth from "../functions/getMonth";

const Generator = () => {
  const [firstnames, setFirstnames] = useState([]);
  const [lastnames, setLastnames] = useState([]);
  const [nouns, setNouns] = useState([]);
  const [verbs, setVerbs] = useState([]);
  const [adj, setAdj] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [generated, setGenerated] = useState("");

  useEffect(() => {
    fetch("/api/firstnames")
      .then((res) => res.json())
      .then((data) => {
        setFirstnames(data);
      });

    fetch("/api/lastnames")
      .then((res) => res.json())
      .then((data) => {
        setLastnames(data);
      });

    fetch("/api/nouns")
      .then((res) => res.json())
      .then((data) => {
        setNouns(data);
      });

    fetch("/api/verbs")
      .then((res) => res.json())
      .then((data) => {
        setVerbs(data);
      });

    fetch("/api/adj")
      .then((res) => res.json())
      .then((data) => {
        setAdj(data);
      });

    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
      });
  }, []);

  const generate = () => {
    // Note: figure out where you can move this const
    const statements = [
      `Statement of ${getName()}, regarding their time in possession of an apparently ${getAdj()} ${getNoun()}`,
      `Statement of ${getName()}, regarding an alleged ${getNoun()} of their acquaintance ${getName()}`,
      `Statement of ${getName()}, regarding a ${getAdj()} ${getNoun()} briefly in their possession in the winter of ${getYear()}`,
      `Statement of ${getName()}, regarding ${getPluralNoun()} recovered from the refuse of 93 Lancaster Road, Walthamstowe`,
      `Statement of ${getName()} regarding their ${getAdj()} encounter with ${getName()} and their subsequent death`,
      `Statement of ${getName()} regarding their experiences during the ${getIngVerb()} of a ${getNoun()} on Hill Top Road, Oxford`,
      `Statement of ${getName()}, on the ${getIngVerb()} of their associate ${getName()}`,
      `Statement of ${getName()}, regarding their ${getNoun()} and its manifestations`,
      `Statement of Father ${getName()}, regarding their claimed ${getEdVerb()} ${getNoun()}`,
      `Statement of ${getName()}, regarding a discovered ${getNoun()} near their ${getNoun()} in the Black Forest`,
      `Statement of ${getName()}, regarding an antique ${getNoun()} they possessed briefly in ${getMonth()} ${getYear()}`,
      `Statement of ${getName()}, regarding a series of ${getAdj()} ${getPluralNoun()}`,
      `Statement of ${getName()}, regarding repeated ${getAdj()} intrusions into their ${getNoun()}`,
      `Statement of ${getName()}, regarding their own ${getNoun()}`,
      `Statement of ${getName()}, regarding their time ${getIngVerb()} at an industrial abattoir near Dalston`,
      `Statement of ${getName()}, regarding their ${getIngVerb()} trip to Blue Ridge, Viginia`,
      `Statement of ${getName()}, regarding a ${getAdj()} ${getNoun()} in their attic`,
      `Statement of ${getName()}, regarding his life as a self-proclaimed ${getJob()}`,
    ];

    setGenerated(statements[Math.round(Math.random() * statements.length - 1)]);
    // setGenerated(statements[10]);
  };
  const getNoun = () => {
    return nouns[Math.round(Math.random() * nouns.length - 1)].noun;
  };

  const getPluralNoun = () => {
    const noun = nouns[Math.round(Math.random() * nouns.length - 1)].noun;
    if (noun[noun.length - 1] === "s" || noun[noun.length - 1] === "y")
      return noun;
    return noun + "s";
  };

  // const getVerb = () => {
  //   return verbs[Math.round(Math.random() * verbs.length - 1)].verb;
  // };

  const getIngVerb = () => {
    const verbNum = Math.round(Math.random() * verbs.length - 1);
    const verb = verbs[verbNum].verb;
    const doubled = verbs[verbNum].doubled;

    if (doubled === true) return verb + verb[verb.length - 1] + "ing";
    else if (verb[verb.length - 1] === "e") return verb.slice(0, -1) + "ing";
    return verb + "ing";
  };

  const getEdVerb = () => {
    const verbNum = Math.round(Math.random() * verbs.length - 1);
    const verb = verbs[verbNum].verb;
    const doubled = verbs[verbNum].doubled;

    if (doubled) return verb + verb[verb.length - 1] + "ed";
    else if (verb[verb.length - 1] === "e") return verb + "d";
    return verb + "ed";
  };

  const getAdj = () => {
    return adj[Math.round(Math.random() * adj.length - 1)].adj;
  };

  const getName = () => {
    const nameType = Math.floor(Math.random() * 10) + 1;
    if (nameType === 1) return tmaName();
    return (
      firstnames[Math.round(Math.random() * firstnames.length - 1)].first_name +
      " " +
      lastnames[Math.round(Math.random() * lastnames.length - 1)].last_name
    );
  };

  const getYear = () => Math.floor(Math.floor(Math.random() * 523) + 1500);

  const getJob = () => {
    return jobs[Math.round(Math.random() * jobs.length - 1)].job.toLowerCase();
  };

  return (
    <div>
      <h2>TMA Statement Generator</h2>
      <h3>{generated}</h3>
      <button onClick={generate}>Click to generate</button>
    </div>
  );
};

export default Generator;

/**
 * Ideas: get jobs, relations, places, events, -ing verbs
 * Add Magnus archive-y words!
 * add gendered statements
 * Reached: 33
 * https://snarp.github.io/magnus_archives_transcripts/
 * -ed and -ing verbs don't know when to do double constinants before -ed/-ing
 * math.round vs. math.floor?
 * add lie verb
 *
 * Unused statements:
 * `Statement of ${getName()} regarding the actions and motivations of her ${getRelation()}, the ${getJob()} ${getName()}`
 * Statement of Antonio Blake, regarding his recent dreams about Gertrude Robinson, previous Head Archivist of the Magnus Institute
 * Statement of Lesere Saraki, regarding a recent night-shift at St. Thomas Hospital, London
 * Statement of Naomi Herne, regarding the events following the funeral of her fiancé, Evan Lukas
 * Statement of Laura Popham, regarding her experience exploring the Three Counties System of caves with her sister Alena Sanderson
 * Statement of Sebastian Adekoya, regarding a new acquisition at Chiswick Library
 * Statement of Christof Rudenko, regarding his interactions with a first floor resident of Welbeck House, Wandsworth
 * Statement of Moira Kelly, regarding the disappearance of her son Robert
 * Statement of Martin Blackwood, archival assistant at the Magnus Institute, London, regarding a close encounter with something he believes to have once been Jane Prentiss
 * Statement of Mark Bilham, regarding events culminating in his visit to Hither Green Chapel
 * Statement of Melanie King, regarding events at the abandoned Cambridge Military Hospital during filming in January 2015
 * Statement of Carlita Sloane, regarding her work on a container ship travelling from Southampton to Porto do Itaqui
 * `Statement of ${getName()}, regarding a new ${getNoun()} at Chiswick Library`
 */
