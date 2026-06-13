"use client";

import {
  Table,
  Chip,
} from "@heroui/react";
import { Eye, PencilToLine, TrashBin } from "@gravity-ui/icons";

const statusColorMap = {
  active: "success",
  closed: "danger",
  draft: "warning",
};

export default function JobsTable({ jobs = [] }) {
  return (
    <div className="bg-[#0d0f13] border border-white/8 rounded-2xl overflow-hidden">
      <Table aria-label="Recruiter jobs table">
        <Table.ScrollContainer>
          <Table.Content>
            <Table.Header>
              <Table.Column isRowHeader>Job Title</Table.Column>
              <Table.Column>Type</Table.Column>
              <Table.Column>Salary Range</Table.Column>
              <Table.Column>Location</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Actions</Table.Column>
            </Table.Header>

            <Table.Body>
              {jobs.map((job) => (
                <Table.Row key={job._id?.$oid ?? job._id}>
                  <Table.Cell>
                    <div className="flex flex-col">
                      <span className="font-medium text-white">
                        {job.title}
                      </span>
                      <span className="text-xs text-gray-500">
                        {job.category}
                      </span>
                    </div>
                  </Table.Cell>

                  <Table.Cell>{job.type}</Table.Cell>

                  <Table.Cell>
                    {job.currency} {Number(job.salaryMin).toLocaleString()} –{" "}
                    {Number(job.salaryMax).toLocaleString()}
                  </Table.Cell>

                  <Table.Cell>
                    {job.isRemote ? (
                      <span className="text-[#818CF8]">Remote</span>
                    ) : (
                      `${job.city}, ${job.country}`
                    )}
                  </Table.Cell>

                  <Table.Cell>
                    <Chip
                      size="sm"
                      variant="flat"
                      color={statusColorMap[job.status] ?? "default"}
                      className="capitalize"
                    >
                      {job.status}
                    </Chip>
                  </Table.Cell>

                  <Table.Cell>
                    <div className="flex items-center justify-end gap-1.5">
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#818CF8]">
                        <PencilToLine className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-400">
                        <TrashBin className="w-4 h-4" />
                      </button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}
