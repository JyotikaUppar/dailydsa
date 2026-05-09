import { useRouter } from "next/router";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Bookmark from "../../../images/companies/bookmark.png";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Box from "@mui/material/Box";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { arrayData } from "@/data/arrayData";
import TablePagination from "@mui/material/TablePagination";
import { useState, useMemo } from "react";
import { Map } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function ProblemName() {
  const router = useRouter();
  const { userData, updateUserProfile } = useAuth();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const filteredData = useMemo(() => {
    if (!router.query.slug) return [];
    
    // Mapping URL slugs to topic names in the data
    const slugMap = {
      "array": ["Array"],
      "backtracking": ["Backtracking"],
      "dynamic-programming": ["Dynamic Programming"],
      "string": ["String"],
      "hash-table": ["Hash Table", "Hash Function"],
      "stack": ["Stack", "Monotonic Stack", "Queue"],
      "tree": ["Tree", "Binary Tree", "Binary Search Tree"],
      "graph": ["Graph", "Depth-First Search", "Breadth-First Search", "Topological Sort"]
    };

    const targetTopics = slugMap[router.query.slug.toLowerCase()] || [router.query.slug.replace(/-/g, ' ')];

    return arrayData.filter(q => 
      q.topicTags?.some(t => 
        targetTopics.some(topic => t.name.toLowerCase().includes(topic.toLowerCase()))
      )
    );
  }, [router.query.slug]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "rgba(31, 41, 55, 0.5)",
      color: "#fff",
      fontWeight: 600,
      fontSize: 15,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      borderBottom: "1px solid rgba(55, 65, 81, 0.5)",
      color: "#d1d5db",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "rgba(17, 24, 39, 0.5)",
    },
    "&:hover": {
      backgroundColor: "rgba(124, 58, 237, 0.1)",
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-[#0f1117] text-white selection:bg-violet-500/30 font-sans pb-20">
      <Header />
      
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>

      <div className="relative z-10 pt-32 text-gray-300" id="testimonials">
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6 ">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-violet-500/10 border border-violet-500/20">
              <Map className="text-violet-500" size={24} />
            </div>
            <h2 className="text-3xl font-bold text-white capitalize">
              {router.query.slug} Questions
            </h2>
          </div>

          <TableContainer
            component={Paper}
            className="lg:w-10/12 lg:mx-auto mt-14 border border-gray-700/50 rounded-3xl overflow-hidden bg-gray-800/40 backdrop-blur-xl shadow-2xl flex justify-center item-center"
            sx={{ backgroundColor: "transparent", backgroundImage: "none", boxShadow: "none" }}
          >
            <Table sx={{ minWidth: 400 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>LeetCode Id</StyledTableCell>
                  <StyledTableCell align="left">Title</StyledTableCell>
                  <StyledTableCell align="left">Acceptance</StyledTableCell>
                  <StyledTableCell align="left">Difficulty</StyledTableCell>
                  <StyledTableCell align="left">Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedData.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {row.questionId}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      className="hover:text-violet-700 cursor-pointer"
                      onClick={() =>
                        window.open(
                          `https://leetcode.com/problems/${row.titleSlug}/`,
                          "_blank",
                          "noopener,noreferrer"
                        )
                      }
                    >
                      {row.title}
                    </StyledTableCell>
                    <StyledTableCell align="">{row.acRate}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.difficulty === "Easy" ? (
                        <div className="px-3 py-1 w-fit bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider rounded-full border border-emerald-500/20">
                          Easy
                        </div>
                      ) : row.difficulty === "Hard" ? (
                        <div className="px-3 py-1 w-fit bg-rose-500/10 text-rose-400 text-[10px] font-bold uppercase tracking-wider rounded-full border border-rose-500/20">
                          Hard
                        </div>
                      ) : (
                        <div className="px-3 py-1 w-fit bg-amber-500/10 text-amber-400 text-[10px] font-bold uppercase tracking-wider rounded-full border border-amber-500/20">
                          Medium
                        </div>
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-gray-700 bg-gray-900/50 text-violet-600 focus:ring-violet-500"
                        checked={userData?.solvedProblems?.some(p => (typeof p === 'string' ? p : p.titleSlug) === row.titleSlug)}
                        onChange={async (e) => {
                          const isChecked = e.target.checked;
                          const currentSolved = userData?.solvedProblems || [];
                          let newSolved;
                          if (isChecked) {
                            const solveEntry = {
                              titleSlug: row.titleSlug,
                              title: row.title,
                              solvedAt: new Date().toISOString(),
                              difficulty: row.difficulty,
                              topic: row.topicTags?.[0]?.name || "General"
                            };
                            newSolved = [...currentSolved, solveEntry];
                          } else {
                            newSolved = currentSolved.filter(p => (typeof p === 'string' ? p : p.titleSlug) !== row.titleSlug);
                          }
                          await updateUserProfile({ solvedProblems: newSolved });
                        }}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            className="lg:w-10/12 lg:mx-auto text-gray-400"
            sx={{
              color: '#9ca3af',
              '.MuiTablePagination-selectIcon': { color: '#9ca3af' },
              '.MuiTablePagination-actions': { color: '#9ca3af' }
            }}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
