import React, { useState, useEffect } from "react";
import "./Generator.css";
import mainImg from "../media/mainimg.jpeg";

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
      `Statement of ${getName()}, regarding their life as a self-proclaimed ${getJob()}`,
      `Statement of ${getName()}, regarding a series of misplaced ${getPluralNoun()} lost over the course of three months`,
      `Statement of Police Constable ${getName()} regarding their time investigating strange ${getPluralNoun()} as part of Section 31`,
      `Statement of ${getName()}, regarding their experiences working in ${getNoun()} research during the spring of ${getYear()}`,

      `Statement of ${getName()}, regarding a new ${getNoun()} in a house they were selling`,
      `Statement of ${getName()} regarding their investigations into ${getJob()} ${getName()} during the summer of ${getYear()}`,
    ];
    setGenerated(
      statements[Math.floor(Math.random() * (statements.length - 1))]
    );
    // setGenerated(statements[statements.length - 6]);
    return;
  };

  const getNoun = () => {
    return nouns[Math.floor(Math.random() * nouns.length)].noun;
  };

  const getPluralNoun = () => {
    const noun = nouns[Math.floor(Math.random() * nouns.length)].noun;
    if (noun[noun.length - 1] === "s" || noun[noun.length - 1] === "y")
      return noun;
    return noun + "s";
  };

  // const getVerb = () => {
  //   return verbs[Math.floor(Math.random() * verbs.length - 1)].verb;
  // };

  const getIngVerb = () => {
    const verbNum = Math.floor(Math.random() * verbs.length);
    const verb = verbs[verbNum].verb;
    const doubled = verbs[verbNum].doubled;

    if (doubled === true) return verb + verb[verb.length - 1] + "ing";
    else if (verb[verb.length - 1] === "e" && verb[verb.length - 2] !== "e")
      return verb.slice(0, -1) + "ing";
    return verb + "ing";
  };

  const getEdVerb = () => {
    const verbNum = Math.floor(Math.random() * verbs.length);
    const verb = verbs[verbNum].verb;
    const doubled = verbs[verbNum].doubled;

    if (doubled) return verb + verb[verb.length - 1] + "ed";
    else if (verb[verb.length - 1] === "e" && verb[verb.length - 2] !== "e")
      return verb + "d";
    return verb + "ed";
  };

  const getAdj = () => {
    return adj[Math.floor(Math.random() * adj.length)].adj;
  };

  const getName = () => {
    const nameType = Math.floor(Math.random() * 10) + 1;
    if (nameType === 1) return tmaName();
    return (
      firstnames[Math.floor(Math.random() * firstnames.length)].first_name +
      " " +
      lastnames[Math.floor(Math.random() * lastnames.length)].last_name
    );
  };

  const getYear = () => Math.floor(Math.floor(Math.random() * 523) + 1500);

  const getJob = () => {
    return jobs[Math.floor(Math.random() * jobs.length)].job.toLowerCase();
  };

  return (
    <div className="generator">
      <img src={mainImg} className="mainimg" alt="The Magnus Archives logo" />
      <h2>Statement Generator</h2>
      <p>{generated}</p>
      <button onClick={generate}>Click here to generate</button>
    </div>
  );
};

export default Generator;

/**
 * Ideas: 
 * Reached: 50
 * https://snarp.github.io/magnus_archives_transcripts/
 * add lie verb
 * a vs. an
 * fix plural nouns ending in y
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
 * Original recording of Jane Prentiss' attack upon The Magnus Institute, London, 29th July 2016
 * Statement of Jason North, regarding the discovery of an alleged ritual site found near Loch Glass in Scotland
 * Statement of Nicole Baxter, regarding visits culminating in the fire that consumed Ivy Meadows Care Home in Woodley, Greater Manchester
 * Statement of Harold Silvana, regarding discoveries made during the renovation of the Reform Club, Pall Mall
 * Statement of Dr. Lionel Elliott, regarding a series of events that took place during his class 'Introduction to Human Anatomy and Physiology' at King's College, London
 * Statement of Jonathan Sims, Head Archivist of the Magnus Institute, regarding exploration of the tunnels recently discovered below the archive
 * Statement of Jennifer Ling, regarding a live musical performance she attended in Soho
 * Statement of Elias Buchard, Tim Stoker, Sasha James, Martin Blackwood and Jonathan Sims regarding the infestation of the Magnus Institute by the entity formerly known as Jane Prentiss
 * Statement of Andrea Nunis, regarding a series of encounters in the streets of Genoa, Italy
 * Statement of Sampson Kempthrone, regarding the workhouse architecture of George Gilbert Scott
 *       `Statement of ${getName()}, regarding a repeat customer to their ${getNoun()} in Chichester`,
 */
