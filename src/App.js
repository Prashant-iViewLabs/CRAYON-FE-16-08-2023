import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './views/Home'
import Main from './views/Main'
import Jobs from './components/guest/jobs/Jobs';
import Talent from './components/guest/talent/Talent';
import MyJobs from './components/employer/myJobs/MyJobs';
import Search from './components/admin/search/Search';
import AdminTalent from './components/admin/adminTalent/AdminTalent';
import AdminJobs from './components/admin/adminJobs/AdminJobs';
import BuildSearch from './components/admin/search/BuildSearch';
import JobTitles from './components/admin/maintenance/JobTitles';
import ActiveJobs from './components/admin/adminJobs/activeJobs/ActiveJobs';
import ActiveJobDetail from './components/admin/adminJobs/ActiveJobDetail';
import AllTalent from './components/admin/adminTalent/AllTalent';
import TalentPool from './components/admin/adminTalent/TalentPool';
import Admin from './components/admin/index';
import MyJobsCandidate from './components/candidate/myJobs/MyJobs';
import MyCV from './components/candidate/myCV/MyCV';
import JobListing from './components/guest/jobs/JobListing';
import ComingSoon from './components/common/ComingSoon';

import MyTalents from './components/admin/myTalent/MyTalents';
import Applicants from './components/admin/myTalent/Applicants';
import Followers from './components/admin/myTalent/Followers';

import Candidate from './components/candidate';
import Employer from './components/employer';

import PostAJob from './components/employer/postAJob/PostAJob';
import MyProfileCan from './components/candidate/myProfile/MyProfile';
import MyProfileEmp from './components/employer/myProfile/MyProfile';
import PrivateRoute from './components/route/PrivateRoute';

import PendingJobs from './components/admin/adminJobs/pendingJobs/PendingJobs';
import PausedJobs from './components/admin/adminJobs/pausedJobs/PausedJobs';
import ClosedJobs from './components/admin/adminJobs/closedJobs/ClosedJobs';
import CandidateCVPage from './components/candidate/cvPage/CandidateCVPage';
import JobsDetailPage from './components/guest/jobs/JobsDetailPage';
import ManageJob from './components/employer/myJobs/ManageJob';

import MyTeams from './components/employer/myTeams/MyTeams';
import AddNewMember from './components/employer/myTeams/AddNewMember';
import TeamTable from './components/employer/myTeams/TeamTable'
import TeamInfo from './components/employer/myTeams/TeamInfo';
import Company from './components/admin/maintenance/Company';
import Maintenance from './components/admin/maintenance/Maintenance';
import Skills from './components/admin/maintenance/Skills';
import Tools from './components/admin/maintenance/Tools';
import Qualification from './components/admin/maintenance/Qualification';
import Associations from './components/admin/maintenance/Associations';
import Institution from './components/admin/maintenance/Institution';
import Schools from './components/admin/maintenance/Schools';
import Towns from './components/admin/maintenance/Towns';
import Nationalities from './components/admin/maintenance/Nationalities';
import Languages from './components/admin/maintenance/Languages';
import Industries from './components/admin/maintenance/Industries';
import QualificationTypes from './components/admin/maintenance/QualificationTypes';
import Currencies from './components/admin/maintenance/Currencies';
import TalentPoolInfo from './components/admin/adminTalent/TalentPoolInfo';
import AdminJobsDetailPage from './components/admin/adminJobs/AdminJobsDetailPage';
import TalentDetailPage from './components/admin/adminTalent/TalentDetailPage';



export default function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Main />} >
        <Route path='/' element={<Home />} />
        <Route path='jobs' element={<Jobs />} />
        <Route path='talent' element={<Talent />} />
        {/* <Route path='solutions' element={<Solutions />} /> */}

        <Route exact path='employer' element={<PrivateRoute><Employer /></PrivateRoute>} >
          <Route path='my-team' element={<PrivateRoute><MyTeams /></PrivateRoute>}>
            <Route path='' element={<PrivateRoute><TeamTable /></PrivateRoute>} />
            <Route path='add-new-member' element={<PrivateRoute><AddNewMember /></PrivateRoute>} />
            <Route path='team-info/:id' element={<PrivateRoute><TeamInfo /></PrivateRoute>} />
          </Route>
          <Route path='my-jobs' element={<PrivateRoute><MyJobs /></PrivateRoute>} />
          <Route path='post-a-job/:jobId?' element={<PrivateRoute><PostAJob /></PrivateRoute>} />
          <Route path='my-profile' element={<PrivateRoute><MyProfileEmp /></PrivateRoute>} />
          <Route path='manage-talent/:jobId' element={<PrivateRoute><ManageJob /></PrivateRoute>} />
        </Route>

        <Route exact path='candidate' element={<PrivateRoute><Candidate /></PrivateRoute>} >
          <Route path='my-jobs' element={<PrivateRoute><MyJobsCandidate /></PrivateRoute>} />
          <Route path='my-cv' element={<PrivateRoute><MyCV /></PrivateRoute>} />
          <Route path='my-profile' element={<PrivateRoute><MyProfileCan /></PrivateRoute>} />
        </Route>

        <Route exact path='admin' element={<PrivateRoute><Admin /></PrivateRoute>} >
          <Route path='admin-talent' element={<PrivateRoute><AdminTalent /></PrivateRoute>} >
            <Route path='all-talent' element={<PrivateRoute><AllTalent /></PrivateRoute>} />
            <Route path='talent-pool' element={<PrivateRoute><TalentPool /></PrivateRoute>} />
            <Route path='talent-pool/:poolId?' element={<PrivateRoute><TalentPoolInfo /></PrivateRoute>} />
            <Route path='applicants' element={<PrivateRoute><Applicants /></PrivateRoute>} />
            <Route path='followers' element={<PrivateRoute><Followers /></PrivateRoute>} />
          </Route>
          <Route path='maintenance' element={<PrivateRoute><Maintenance /></PrivateRoute>} >
            <Route path='company' element={<PrivateRoute><Company /></PrivateRoute>} />
            <Route path='jobtitle' element={<PrivateRoute><JobTitles /></PrivateRoute>} />
            <Route path='skills' element={<PrivateRoute><Skills /></PrivateRoute>} />
            <Route path='tools' element={<PrivateRoute><Tools /></PrivateRoute>} />
            <Route path='qualifications' element={<PrivateRoute><Qualification /></PrivateRoute>} />
            <Route path='associations' element={<PrivateRoute><Associations /></PrivateRoute>} />
            <Route path='institutions' element={<PrivateRoute><Institution /></PrivateRoute>} />
            <Route path='schools' element={<PrivateRoute><Schools /></PrivateRoute>} />
            <Route path='towns' element={<PrivateRoute><Towns /></PrivateRoute>} />
            <Route path='nationalities' element={<PrivateRoute><Nationalities /></PrivateRoute>} />
            <Route path='languages' element={<PrivateRoute><Languages /></PrivateRoute>} />
            <Route path='industries' element={<PrivateRoute><Industries /></PrivateRoute>} />
            <Route path='qualification-types' element={<PrivateRoute><QualificationTypes /></PrivateRoute>} />
            <Route path='currencies' element={<PrivateRoute><Currencies /></PrivateRoute>} />
          </Route>
          <Route path='adminJobs' element={<PrivateRoute><AdminJobs /></PrivateRoute>} >
            <Route path='active-jobs' element={<PrivateRoute><ActiveJobs /></PrivateRoute>} />
            <Route path='active-jobs/:id' element={<PrivateRoute><ActiveJobDetail /></PrivateRoute>} />
            <Route path='pending-jobs' element={<PrivateRoute><PendingJobs /></PrivateRoute>} />
            <Route path='paused-jobs' element={<PrivateRoute><PausedJobs/></PrivateRoute>} />
            <Route path='closed-jobs' element={<PrivateRoute><ClosedJobs/></PrivateRoute>} />
          </Route>
          <Route path='Search' element={<PrivateRoute><Search /></PrivateRoute>} >
            <Route path='build-search' element={<PrivateRoute><BuildSearch /></PrivateRoute>} />
          </Route>
          <Route path='*' element={<PrivateRoute><ComingSoon /></PrivateRoute>} />
        </Route>

        <Route path='*' element={<ComingSoon />} />
        <Route path='candidate-cv/:id' element={<CandidateCVPage />} />
        <Route path='/:prev1/:prev2/:prev3/candidate-cv/:id' element={<TalentDetailPage />} />
        <Route path='/:prev/job-detail/:location/:id' element={<JobsDetailPage />} />
        <Route path='/:prev1/:prev2/:prev3/job-detail/:location/:id' element={<AdminJobsDetailPage />} />
      </Route>
      <Route path='*' element={<PrivateRoute><ComingSoon /></PrivateRoute>} />
    </Routes>
  );
}

